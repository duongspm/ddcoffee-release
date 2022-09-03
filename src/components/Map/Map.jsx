import React from 'react'

function Map() {
    return (
        <div id='ggmap' className='w-full'>
            <div className='my-12'>
                <p className='text-3xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-green-600 to-green-800 transition-all ease-in-out duration-100'>
                    Chỉ Đường
                </p>
            </div>
            <div className='w-full pb-10'>
                <iframe className='w-full h-96' frameborder="0" scrolling="no" marginheight="0" marginwidth="0" id="gmap_canvas" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d244.81393154313065!2d106.66781157598476!3d10.961642258112326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d1a21d25aca7%3A0xb97e12c9ba454482!2sDD%20Coffee%20%26%20Tea!5e0!3m2!1svi!2s!4v1662173436031!5m2!1svi!2s"></iframe> <a href='http://maps-website.com/es'></a> <script type='text/javascript' src='https://embedmaps.com/google-maps-authorization/script.js?id=ecf13d40472eb9239077d42c3dcb53ffb8f761e5'></script>
            </div>
        </div>
    )
}

export default Map
