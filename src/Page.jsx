import './styles/page.css'

export function Item(props) {
    const item = props.item;
    return (
        <div className="item">
            {item}
        </div>
    );
}

export function Module(props) {
    const module = props.module;
    return (
        <div className="module">
            <div className="module_title">{module.title}</div>
            <div className="module_title">{module.subtitle}</div>
            <div className="module_content">{module.content}</div>
        </div>
    );
}

export function Section(props) {
    const section = props.section;
    return (
        <div className="section">
            <div className="element section_header">
                <h2>{section.title}</h2>
                <div className="line"></div>
            </div>
            <div className="section_content">
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
                    <h3>{elements.subtitle}</h3>
                </div>
                <div>
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