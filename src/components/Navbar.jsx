import { useState } from 'react'
import { logout } from '../api/security'

export default function Navbar ({ setIsLogin, setMessages }) {
  const [isBlackTheme, setIsBlackTheme] = useState(true)

  // Change of theme
  const toggleTheme = () => {
    const currentTheme = window.localStorage.theme === 'light' ? 'dark' : 'light' // The opposite of the current theme is selected
    window.localStorage.theme = currentTheme // We save the choice

    document.documentElement.classList.add(currentTheme) // The theme change is applied
    document.documentElement.classList.remove(
      window.localStorage.theme === 'light' ? 'dark' : 'light'
    ) // We delete the old theme

    setIsBlackTheme(window.localStorage.theme !== 'light') // We change the icon of the theme
  }

  // Logout
  const handleLogout = () => {
    logout()
      .end(function (error, res) {
        // We process the data received

        if (error) throw error

        const data = JSON.parse(res.text) // The JSON data is converted into data that can be understood by Javascript
        if (Number(data.status) === 200) {
          // If the request has worked then

          setIsLogin(false) // Display of the modal
          setMessages([]) // The message table is made empty
        } else {
          setMessages(messages => {
            // Sending an error message
            return [
              {
                content:
                  'Une erreur est survenue lors de la requête. Merci de contacter un administrateur.',
                classes: ['text-red-500'],
                background: true,
                isQuestion: false
              },
              ...messages
            ]
          })
        }
      })
  }

  return (
    <header className='fixed top-0 left-0 font-semibold p-2 text-black backdrop-blur-lg bg-zinc-50/70 dark:bg-zinc-900/70 dark:text-white w-full duration-300 z-50'>
      <div className='flex max-w-7xl mx-auto p-2 items-center'>
        <a
          title='Sya, votre assistant web'
          href='.'
          className='inline-flex items-center space-x-2 z-40'
        >
          <svg
            className='h-12 w-12 fill-black dark:fill-white hover:scale-105 duration-200'
            xmlns='http://www.w3.org/2000/svg'
            xmlnsXlink='http://www.w3.org/1999/xlink'
            zoomAndPan='magnify'
            viewBox='0 0 375 374.999991'
            preserveAspectRatio='xMidYMid meet'
            version='1.0'
          >
            <defs>
              <clipPath>
                <path
                  d='M 13.839844 42 L 361.089844 42 L 361.089844 337.5 L 13.839844 337.5 Z M 13.839844 42 '
                  clipRule='nonzero'
                />
              </clipPath>
            </defs>
            <g clipPath='url(#93219ad2fd)'>
              <path
                d='M 274.277344 242.125 C 274.277344 256.527344 262.625 268.179688 248.226562 268.179688 C 233.859375 268.179688 222.207031 256.527344 222.207031 242.125 C 222.207031 227.726562 233.859375 216.070312 248.226562 216.070312 C 262.625 216.070312 274.277344 227.726562 274.277344 242.125 Z M 152.75 242.125 C 152.75 256.527344 141.066406 268.179688 126.699219 268.179688 C 112.304688 268.179688 100.652344 256.527344 100.652344 242.125 C 100.652344 227.726562 112.304688 216.070312 126.699219 216.070312 C 141.066406 216.070312 152.75 227.726562 152.75 242.125 Z M 309.019531 285.542969 C 308.988281 304.71875 293.453125 320.261719 274.277344 320.261719 L 100.652344 320.261719 C 81.476562 320.261719 65.9375 304.71875 65.9375 285.542969 L 65.9375 198.710938 C 65.9375 179.53125 81.476562 163.992188 100.652344 163.960938 L 274.277344 163.960938 C 293.453125 163.992188 308.988281 179.53125 309.019531 198.710938 Z M 335.039062 216.070312 L 326.34375 216.070312 L 326.34375 198.710938 C 326.34375 169.941406 303.039062 146.601562 274.277344 146.601562 L 204.820312 146.601562 L 204.820312 107.070312 C 221.4375 97.480469 227.140625 76.238281 217.519531 59.617188 C 207.933594 42.996094 186.722656 37.324219 170.105469 46.914062 C 153.492188 56.503906 147.789062 77.746094 157.40625 94.335938 C 160.425781 99.640625 164.835938 104.019531 170.105469 107.070312 L 170.105469 146.601562 L 100.652344 146.601562 C 71.886719 146.601562 48.550781 169.941406 48.550781 198.710938 L 48.550781 216.070312 L 39.886719 216.070312 C 25.492188 216.070312 13.839844 227.726562 13.839844 242.125 C 13.839844 256.527344 25.492188 268.179688 39.886719 268.179688 L 48.550781 268.179688 L 48.550781 285.542969 C 48.550781 314.308594 71.886719 337.652344 100.652344 337.652344 L 274.277344 337.652344 C 303.039062 337.652344 326.34375 314.308594 326.34375 285.542969 L 326.34375 268.179688 L 335.039062 268.179688 C 349.4375 268.179688 361.089844 256.527344 361.089844 242.125 C 361.089844 227.726562 349.4375 216.070312 335.039062 216.070312 '
                fillOpacity='1'
                fillRule='nonzero'
              />
            </g>
          </svg>
        </a>
        <div className='flex ml-auto items-center space-x-2'>
          <button
            title='Changer la couleur de votre thème'
            className='flex items-center border fill-black dark:fill-white hover:fill-white dark:hover:fill-black hover:bg-black dark:hover:bg-white rounded-full p-2 lg:p-3 duration-300 group'
            onClick={toggleTheme}
          >
            <svg className='w-6 h-6 inline-flex items-center'>
              {isBlackTheme
                ? (
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M12 9c1.65 0 3 1.35 3 3s-1.35 3-3 3-3-1.35-3-3 1.35-3 3-3Zm0-2c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5ZM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1Zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1ZM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1Zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1ZM5.99 4.58a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .38-.39.39-1.03 0-1.41L5.99 4.58Zm12.37 12.37a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 0 0 0-1.41l-1.06-1.06Zm1.06-10.96a.996.996 0 0 0 0-1.41.996.996 0 0 0-1.41 0l-1.06 1.06a.996.996 0 0 0 0 1.41c.39.38 1.03.39 1.41 0l1.06-1.06ZM7.05 18.36a.996.996 0 0 0 0-1.41.996.996 0 0 0-1.41 0l-1.06 1.06a.996.996 0 0 0 0 1.41c.39.38 1.03.39 1.41 0l1.06-1.06Z'
                  />
                  )
                : (
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M9.37 5.51A7.35 7.35 0 0 0 9.1 7.5c0 4.08 3.32 7.4 7.4 7.4.68 0 1.35-.09 1.99-.27A7.014 7.014 0 0 1 12 19c-3.86 0-7-3.14-7-7 0-2.93 1.81-5.45 4.37-6.49ZM12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1Z'
                  />
                  )}
            </svg>
          </button>
          <button
            title='Se déconnecter'
            onClick={handleLogout}
            className='flex items-center border hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black rounded-full p-2 lg:p-3 duration-300 group'
          >
            <svg className='h-6 w-6' fill='currentColor' viewBox='0 0 24 24'>
              <path d='M14.08 15.59 16.67 13H7v-2h9.67l-2.59-2.59L15.5 7l5 5-5 5-1.42-1.41ZM19 3a2 2 0 0 1 2 2v4.67l-2-2V5H5v14h14v-2.67l2-2V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5c0-1.11.89-2 2-2h14Z' />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}
