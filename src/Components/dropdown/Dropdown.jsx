import React, {useRef} from 'react'
import './dropdown.css'

const clickoutsideRef = (content_ref, toggle_ref) =>{
    document.addEventListener('mousedown', (e) =>{
        if(toggle_ref.current && toggle_ref.current.contains(e.target))
        {
            content_ref.current.classList.toggle('active')
        } else{
            if(content_ref.current && !content_ref.current.contains(e.target))
            {
                content_ref.current.classList.remove('active')
            }
        }
    })
}

const Dropdown = props => {

    
    const dropdown_toggle_el =  useRef(null)
    const dropdown_content_el = useRef(null)

    clickoutsideRef(dropdown_content_el,dropdown_toggle_el)

    return (
        <div className="dropdown">
            <button ref= {dropdown_toggle_el} className="dropdown_toggle">
                {
                    props.icon ? <i className={props.icon}></i> : ""
                }
                {
                    props.badge ? <span className="dropdown_toggle-badge">{props.badge}</span> : ''
                }
                {
                    props.customtoggle ? props.customtoggle() :''
                }
            </button>
            <div ref={dropdown_content_el} className="dropdown_content">
                {
                    props.contentData && props.renderItems ? props.contentData.map((item, index)=>
                     props.renderItems(item , index)) : ''
                }
                {
                    props.renderfooter?(
                        <div className="dropdown_footer">
                            {props.renderfooter()}
                        </div>
                    ) : ''
                }
            </div>
        </div>
    )
}

export default Dropdown
