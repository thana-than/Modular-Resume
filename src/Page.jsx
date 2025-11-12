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
    return (
        <div className="page">
            <div className="element resume_head">
                <div className="element section_group resume_header">
                    {elements.head_left}
                </div>
                <div className="element section_group resume_subhead">
                    {elements.head_right}
                </div>
            </div>

            <div className="element resume_body">
                <div className="element section_group resume_side">
                    {elements.sub}
                </div>
                <div className='resume_full'>
                    <div className="element section_group resume_main">
                        {elements.main}
                    </div>
                    <div className="element section_group resume_bottom">
                        {elements.bottom}
                    </div>
                </div>
            </div>
        </div>
    )
}