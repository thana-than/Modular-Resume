import json
import psycopg2
from bs4 import BeautifulSoup
from psycopg2.extras import DictCursor
from psycopg2 import pool
from types import SimpleNamespace
import os

class Database:
    def __init__(self):
        self.config = SimpleNamespace(
            database=os.getenv("DB_NAME", "postgres"),
            user=os.getenv("DB_USER", "postgres"),
            password=os.getenv("DB_PASS", ""),
            host=os.getenv("DB_HOST", "localhost"),
            port=int(os.getenv("DB_PORT", 5432))
        )
        self.pool = None
        self.sql_table = "items"

    def start(self):
        """Initialize the connection pool"""
        print("Starting Database Connection")
        self.pool = pool.SimpleConnectionPool(1, 20, **vars(self.config))

    def close(self):
        """Close all connections in the pool"""
        if self.pool:
            print("Closing Database Connections")
            self.pool.closeall()

    def execute(self, command):
        """Execute a command using a connection from the pool"""
        conn = self.pool.getconn()
        try:
            cursor = conn.cursor(cursor_factory=DictCursor)
            cursor.execute(command)
            return cursor.fetchall()
        finally:
            cursor.close()
            self.pool.putconn(conn)

    def get_by_ids(self, ids):
        """Get items by their IDs"""
        id_str = ", ".join([str(id) for id in ids])
        command = f'SELECT * FROM {self.sql_table} WHERE id IN ({id_str})'
        items = self.execute(command)
        return self.validate(items)

    def get_by_category(self, category):
        """Get items by category"""
        command = f'SELECT * FROM {self.sql_table} WHERE category = \'{category}\''
        items = self.execute(command)
        return self.validate(items)

    def get_display_name(self, item):
        """Extract display name from item"""
        name = item['title'] or item['subtitle'] or item['content']
        name = BeautifulSoup(name, "html.parser").get_text()
        return name
    
    def validate(self, items):
        result = []
        for item in items:
            item_dict = dict(item)
            item_dict['display_name'] = self.get_display_name(item_dict)
            result.append(item_dict)

        return result

    def populate_content(self, node):
        """Recursively fetch content from a node structure"""
        # Walk through list
        if isinstance(node, list):
            return [self.populate_content(n) for n in node]

        # Search dictionary elements
        if isinstance(node, dict):
            result = dict(node)

            ids = result.get('ids')
            if isinstance(ids, (list, tuple)) and ids:
                rows = self.get_by_ids(ids) or []
                items = []
                for row in rows:
                    # Convert row to dictionary and remove any null entries
                    item = {key: value for key, value in dict(row).items() if value is not None}
                    items.append(item)
                result.pop('ids', None) # Remove old id array
                result['content'] = items

            # Recursively fetch content
            for k, v in list(result.items()):
                if isinstance(v, (dict, list)):
                    result[k] = self.populate_content(v)

            return result

        # Primitive
        return node