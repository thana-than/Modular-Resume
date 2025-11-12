import './styles/page.css'

export function Item(props) {
    const item = props.item;

    return (
        <div className={props.className}>
            {item.title && <h2 className="title">{item.title}</h2>}
            {item.subtitle && <h3 className="subtitle">{item.subtitle}</h3>}
            {item.content && <div className="content">{item.content}</div>}
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