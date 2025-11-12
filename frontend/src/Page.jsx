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
            {module.title && <h2 className="title">{module.title}</h2>}
            {module.subtitle && <h3 className="subtitle">{module.subtitle}</h3>}
            <div className="content">{module.content}</div>
        </div>
    );
}

export function Section(props) {
    const section = props.section;
    return (
        <div className={props.className}>
            <div className="element header">
                {section.title && <h1>{section.title}</h1>}
                <div className="line"></div>
            </div>
            <div className="content">
                {section.content}
            </div>
        </div>
    );
}

export function Page(props) {
    const elements = props.elements;
    // TODO maybe layout better?
    return (
        <div className="page">
            <div className="element resume_head">
                <div className="element section_group resume_header">
                    {elements[0]}
                </div>
                <div className="element section_group resume_subhead">
                    {elements[1]}
                </div>
            </div>

            <div className="element resume_body">
                <div className="element section_group resume_side">
                    {elements[2]}
                </div>
                <div className='resume_full'>
                    <div className="element section_group resume_main">
                        {elements[3]}
                    </div>
                    <div className="element section_group resume_bottom">
                        {elements[4]}
                    </div>
                </div>
            </div>
        </div>
    )
}