import { Page, Item, Section } from './Page.jsx'

function PageBuilder(props) {

    function primitive(content) {
        return <span dangerouslySetInnerHTML={{ __html: content }} />;
    }

    function build_content(content, path = 'root') {
        if (Array.isArray(content) && content.length === 1 && content[0].type === undefined && typeof content[0] !== 'object') {
            return build_content(content[0], path);
        }

        //* Handle primitives
        if (typeof content !== 'object' || content === null) {
            if (typeof content === 'string') {
                return primitive(content);
            }
            return content;
        }

        //* Map arrays
        if (Array.isArray(content)) {
            return content.map((obj, idx) => {
                const key = `${path}[${idx}]`;

                //* Type specific mapping
                switch (obj.type) {
                    case 'group':
                        return build_content(obj, key)['content'];

                    case 'section':
                        const className = typeof obj.title === 'string' ? `section_${obj.title.toLowerCase()}` : '';
                        return <Section key={key} className={`section ${className}`} section={build_content(obj, key)} />;

                    default:
                        //* Wrap primitives into item objects
                        if (typeof obj !== 'object')
                            return <li key={key}>{primitive(obj)}</li>;

                        return <Item key={key} className={`item`} item={build_content(obj, key)} />;
                }
            });
        }

        //* Recurse for nested objects
        const out = {};
        Object.keys(content).forEach((k) => {
            out[k] = build_content(content[k], `${path}.${k}`);
        });

        return out;
    }

    let built_content = build_content(props.content.default || props.content);

    return (
        <Page elements={built_content} />
    );
}

export default PageBuilder;