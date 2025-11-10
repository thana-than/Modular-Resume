import './styles/page.css'

function Page() {
    return (
        <>
            <div class="page">
                <div class="element resume_header">
                    <div>
                        <h1>Full Name</h1>
                        <h3>Job or Subtitle</h3>
                    </div>
                    <div>
                        <p>Phone: ### ### ####</p>
                        <p>Email: email@emailprovider.com</p>
                        <p>linkedin.com/in/linkedinprovider</p>
                    </div>
                </div>
                <div class="element">
                    <div class="element resume_side">
                        <div class="section">
                            <div class="element section_header">
                                <h2>Skills</h2>
                                <div class="line"></div>
                            </div>
                            <ul>
                                <li>JavaScript</li>
                                <li>TypeScript</li>
                                <li>React</li>
                                <li>Node.js</li>
                                <li>HTML & CSS</li>
                            </ul>
                        </div>
                    </div>
                    <div class="element resume_main">
                        <div class="section">
                            <div class="element section_header">
                                <h2>Experience</h2>
                                <div class="line"></div>
                            </div>
                            <ul>
                                <li>JavaScript</li>
                                <li>TypeScript</li>
                                <li>React</li>
                                <li>Node.js</li>
                                <li>HTML & CSS</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page