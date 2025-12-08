/** biome-ignore-all lint/a11y/useKeyWithClickEvents: <explanation> */
/** biome-ignore-all lint/a11y/noStaticElementInteractions: <explanation> */
import React from 'react'
import { useTheme } from '../Hooks/useTheme'

type Props = {
  setShowDetailPage: React.Dispatch<React.SetStateAction<boolean>>
  detailTitle: string
  detailImage: string
  detailText: string
}
// {` ${theme === 'dark' ? '' : ''}`}

const DetailPage = (props: Props) => {
  const { setShowDetailPage, detailTitle, detailImage, detailText } = props;
  const { theme } = useTheme();

  return (
    <>
      <div className='absolute top-0 right-0 left-0 bottom-0 opacity-80 bg-gray-500' onClick={() => setShowDetailPage(false)}>
      </div>
      <div className={`absolute top-24 right-0 left-0 md:w-[480px] w-[300px] h-[520px] mx-auto opacity-100 rounded-2xl p-4 ${theme === 'dark' ? 'text-white bg-gray-700' : 'text-black bg-amber-50'}`} >
        <img src={`https://image.tmdb.org/t/p/w500/${detailImage}`} alt="dd" className='w-auto h-[60%] object-cover block mx-auto rounded-2xl' />
        <div className='h-[40%] overflow-y-scroll mt-4'>
          <h3 className='h-auto mb-2 text-center text-3xl'>{detailTitle}</h3>
          <p className="h-auto">{detailText}</p>
        </div>
      </div>
    </>
  )
}

export default DetailPage