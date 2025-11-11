import { Page, Item, Module, Section } from './Page.jsx'

function PageBuilder(props) {
    function build_content(content, path = 'root') {
        //* Handle primitives
        if (typeof content !== 'object' || Array.isArray(content) === false && content === null) {
            return content;
        }

        //* Map arrays
        if (Array.isArray(content)) {
            return content.map((obj, idx) => {
                const key = `${path}[${idx}]`;

                //* Type specific mapping
                switch (obj.type) {
                    case 'section':
                        return <Section key={key} section={build_content(obj, key)} />;

                    case 'module':
                        //* Wrap primitives into module objects
                        if (typeof obj !== 'object')
                            obj = { content: obj };

                        return <Module key={key} module={build_content(obj, key)} />;

                    default:
                        return <Item key={key} item={build_content(obj, obj)} />;
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

    let built_content = build_content(props.content);

    return (
        <Page elements={built_content} />
    );
}

export default PageBuilder;