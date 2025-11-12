import json
import os
import psycopg2
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from bs4 import BeautifulSoup
from psycopg2.extras import DictCursor

#TODO read https://testdriven.io/blog/fastapi-react/ and integrate api
#? This scripts job should really just be to operate as a bridge between the client (webapp) and the server (database). The client should build most of the json and simply request for the ids to be filled

load_dotenv()

#TODO remove later
test_json = [
    {
        "type": "group",
        "content": [
            {
                "type": "section",
                "title": "Name",
                "ids": [0, 3, 5]
            },
            {
                "type": "section",
                "title": "Title",
                "ids": [4 ,5 ,6]
            }
        ]
    },
]


db_connection = psycopg2.connect(database=os.getenv("DB_NAME", "postgres"), user=os.getenv("DB_USER", "postgres"), password=os.getenv("DB_PASS", ""), host=os.getenv("DB_HOST", "localhost"), port=os.getenv("DB_PORT", 5432))
try:
    cursor = db_connection.cursor(cursor_factory=DictCursor)

    SQL_TABLE = "items"

    def get_by_ids(ids):
        id_str = ", ".join([str(id) for id in ids])
        command = f'SELECT * FROM {SQL_TABLE} WHERE id IN ({id_str})'
        return fetch(command)

    def get_category(category):
        command = f'SELECT * FROM {SQL_TABLE} WHERE category = \'{category}\''
        return fetch(command)

    def fetch(command):
        cursor.execute(command)
        return cursor.fetchall()
    
    def get_display_name(item):
        name = item['title'] or item['subtitle'] or item['content']
        name = BeautifulSoup(name, "html.parser").get_text()
        return name
    
    def fetch_content(node):
        # Walk through list
        if isinstance(node, list):
            return [fetch_content(n) for n in node]

        # Search dictionary elements
        if isinstance(node, dict):
            result = dict(node)

            ids = result.get('ids')
            if isinstance(ids, (list, tuple)) and ids:
                rows = get_by_ids(ids) or []
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
                    result[k] = fetch_content(v)

            return result

        # Primitive
        return node

    #TODO Remove later
    #?Testing
    out = fetch_content(test_json)
    json_string = json.dumps(out, indent=4)
    print(json_string)

finally:
    db_connection.close()