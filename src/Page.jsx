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
            <h4 className="module_title">{module.title}</h4>
            <h5 className="module_subtitle">{module.subtitle}</h5>
            <p className="module_content">{module.content}</p>
        </div>
    );
}

export function Section(props) {
    const section = props.section;
    return (
        <div className="section">
            <div className="element section_header">
                <h3>{section.title}</h3>
                <div className="line"></div>
            </div>
            <p className="section_content">
                {section.modules}
            </p>
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