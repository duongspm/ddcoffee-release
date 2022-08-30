import React from 'react'

function Map() {
    return (
        <div className='w-full'>
            <div className='my-12'>
                <p className='text-3xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-green-600 to-green-800 transition-all ease-in-out duration-100'>
                    Chỉ Đường
                </p>
            </div>
            <div className='w-full pb-10'>
                <iframe className='w-full h-96' frameborder="0" scrolling="no" marginheight="0" marginwidth="0" id="gmap_canvas" src="https://maps.google.com/maps?width=744&amp;height=488&amp;hl=en&amp;q=397/29A%20%C4%91%C6%B0%E1%BB%9Dng%2030/4,%20Ph%C3%BA%20H%C3%B2a,%20Th%E1%BB%A7%20D%E1%BA%A7u%20M%E1%BB%99t,%20B%C3%ACnh%20D%C6%B0%C6%A1ng%20B%C3%ACnh%20D%C6%B0%C6%A1ng+(DD%20Coffee%20&amp;%20Tea)&amp;t=p&amp;z=17&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe> <a href='http://maps-website.com/es'></a> <script type='text/javascript' src='https://embedmaps.com/google-maps-authorization/script.js?id=ecf13d40472eb9239077d42c3dcb53ffb8f761e5'></script>
            </div>
        </div>
    )
}

export default Map
