import './styles/page.css'

export function Item(props) {
    const item = props.item;
    return (
        <div className={props.className}>
            {item}
        </div>
    );
}

export function Module(props) {
    const module = props.module;
    return (
        <div className={props.className}>
            {module.title && <h4 className="title">{module.title}</h4>}
            {module.subtitle && <h5 className="subtitle">{module.subtitle}</h5>}
            <div className="content">{module.content}</div>
        </div>
    );
}

export function Section(props) {
    const section = props.section;
    return (
        <div className={props.className}>
            <div className="element header">
                {section.title && <h3>{section.title}</h3>}
                <div className="line"></div>
            </div>
            <div className="content">
                {section.modules}
            </div>
        </div>
    );
}

export function Page(props) {
    const elements = props.elements;
    return (
        <div className="page">
            <div className="element resume_header">
                <div>
                    <h1>{elements.name}</h1>
                    <h2>{elements.subtitle}</h2>
                </div>
                <div className="contact">
                    {elements.contact}
                </div>
            </div>
            <div className="element resume_body">
                <div className="element section_group resume_side">
                    {elements.sub}
                </div>
                <div className="element section_group resume_main">
                    {elements.main}
                </div>
            </div>
        </div>
    )
}