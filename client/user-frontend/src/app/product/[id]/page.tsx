/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @next/next/no-img-element */
'use client'
import { Carousel } from 'antd'
import { useState, useRef } from 'react'
import './product-detail.scss'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'

export default function Page({ params }: { params: { id: string } }): React.ReactNode {
  const [activeSlide, setActiveSlide] = useState<number>(0)
  const carouselRef = useRef<any>(null)

  const onChange = (currentSlide: number): void => {
    setActiveSlide(currentSlide)
  }

  const handleHover = (index: number): void => {
    setActiveSlide(index)
    carouselRef.current?.goTo(index)
  }

  const images = [
    '/images/banner/banner-1.jpg',
    '/images/banner/banner-2.jpg',
    '/images/banner/banner-3.jpg',
    '/images/banner/banner-1.jpg',
    '/images/banner/banner-2.jpg',
    '/images/banner/banner-3.jpg',
    '/images/banner/banner-1.jpg',
    '/images/banner/banner-2.jpg',
    '/images/banner/banner-3.jpg'
  ]

  const [startIndex, setStartIndex] = useState<number>(0)
  const visibleImages = 8

  const handleNext = (): void => {
    if (startIndex + visibleImages < images.length) {
      setStartIndex(Math.min(startIndex + 1, images.length - visibleImages))
    }
  }

  const handlePrev = (): void => {
    if (startIndex > 0) {
      setStartIndex(Math.max(startIndex - 1, 0))
    }
  }

  const [isExpanded, setIsExpanded] = useState<boolean>(false)
  const maxLines = 6

  const toggleDescription = (): void => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className='detail-container container'>
      <img className='w-100 ads-container my-2' src='/images/ads-1.png' alt='ads'></img>
      <div className='row g-2'>
        <div className='col-8 '>
          <Carousel
            ref={carouselRef}
            arrows={true}
            draggable={true}
            className='w-100'
            style={{ height: '412px', borderRadius: '7px' }}
            afterChange={onChange}
          >
            {images.map((image, index) => (
              <div key={index}>
                <img src={image} className='product-image w-100' alt='anh banner' />
              </div>
            ))}
          </Carousel>

          <div className='slider-container position-relative'>
            <div className='d-flex mt-2 overflow-hidden'>
              {images.slice(startIndex, startIndex + visibleImages).map((image, index) => (
                <div
                  key={startIndex + index}
                  onMouseEnter={() => handleHover(startIndex + index)}
                  className='me-2 flex-shrink-0'
                  style={{
                    borderRadius: '7px',
                    border: activeSlide === startIndex + index ? '2px solid #007bff' : 'none',
                    width: '12.5%' // 100% / 8 = 12.5%
                  }}
                >
                  <img src={image} className='product-image-slider w-100' alt='anh banner' />
                </div>
              ))}
            </div>
            <button
              className='slider-button prev'
              onClick={handlePrev}
              disabled={startIndex === 0}
              style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)' }}
            >
              <LeftOutlined />
            </button>
            <button
              className='slider-button next'
              onClick={handleNext}
              disabled={startIndex + visibleImages >= images.length}
              style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)' }}
            >
              <RightOutlined />
            </button>
          </div>

          <div className='product-description p-3 pb-1 my-2'>
            <div className='fw-bold text-secondary'>Mô tả chi tiết</div>
            <div
              className={`mt-2 body-s text-description mb-3 ${isExpanded ? '' : 'description-truncate'}`}
              style={{ '--max-lines': maxLines } as React.CSSProperties}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi veritatis distinctio, ipsa ratione
              consequuntur iusto provident laboriosam quibusdam? Voluptatem consectetur consequuntur nihil illo,
              voluptates excepturi rerum aspernatur asperiores eum fugit. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Sequi veritatis distinctio, ipsa ratione consequuntur iusto provident laboriosam
              quibusdam? Voluptatem consectetur consequuntur nihil illo, voluptates excepturi rerum aspernatur
              asperiores eum fugit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi veritatis distinctio,
              ipsa ratione consequuntur iusto provident laboriosam quibusdam? Voluptatem consectetur consequuntur nihil
              illo, voluptates excepturi rerum aspernatur asperiores eum fugit. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Sequi veritatis distinctio, ipsa ratione consequuntur iusto provident laboriosam
              quibusdam? Voluptatem consectetur consequuntur nihil illo, voluptates excepturi rerum aspernatur
              asperiores eum fugit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi veritatis distinctio,
              ipsa ratione consequuntur iusto provident laboriosam quibusdam? Voluptatem consectetur consequuntur nihil
              illo, voluptates excepturi rerum aspernatur asperiores eum fugit. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Sequi veritatis distinctio, ipsa ratione consequuntur iusto provident laboriosam
              quibusdam? Voluptatem consectetur consequuntur nihil illo, voluptates excepturi rerum aspernatur
              asperiores eum fugit.
            </div>
            <div className='m-2 btn-more text-center py-2 fw-bold' onClick={toggleDescription}>
              {isExpanded ? 'Rút gọn' : 'Xem thêm'}
            </div>
          </div>
        </div>
        <div className='col-4'>
          <div className='w-100 p-2 product-info'>
            <div className='body-m fw-bold'>Porsche Panamera 2019 lướt keng</div>
            <div className='body-s category-text pt-2 pb-1'>2019 . 30000 km . Xăng . Tự động</div>
          </div>
        </div>
      </div>
    </div>
  )
}