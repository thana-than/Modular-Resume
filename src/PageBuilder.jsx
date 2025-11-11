import { Page, Item, Module, Section } from './Page.jsx'

function PageBuilder(props) {
    function build_content(content, path = 'root', additionalClassNames = '') {
        //* Handle primitives
        if (typeof content !== 'object' || Array.isArray(content) === false && content === null) {
            if (typeof content === 'string') {
                return <span dangerouslySetInnerHTML={{ __html: content }} />;
            }
            return content;
        }

        //* Map arrays
        if (Array.isArray(content)) {
            return content.map((obj, idx) => {
                const key = `${path}[${idx}]`;

                //* Type specific mapping
                switch (obj.type) {
                    case 'section':
                        if (typeof obj.title === 'string') {
                            //? might be a cleaner way of doing this
                            additionalClassNames = `section_${obj.title.toLowerCase()}`;
                        }

                        return <Section key={key} className={`section ${additionalClassNames}`} section={build_content(obj, key, additionalClassNames)} />;

                    case 'module':
                        //* Wrap primitives into module objects
                        if (typeof obj !== 'object')
                            obj = { content: obj };

                        return <Module key={key} className={`module  ${additionalClassNames}`} module={build_content(obj, key, additionalClassNames)} />;

                    default:
                        return <Item key={key} className={`item  ${additionalClassNames}`} item={build_content(obj, obj, additionalClassNames)} />;
                }
            });
        }

        //* Recurse for nested objects
        const out = {};
        Object.keys(content).forEach((k) => {
            out[k] = build_content(content[k], `${path}.${k}`, additionalClassNames);
        });

        return out;
    }

    let built_content = build_content(props.content);

    return (
        <Page elements={built_content} />
    );
}

export default PageBuilder;