import h from 'hyperscript';
import lozad from "lozad";
import { fetchPopular, fetchHighestRated, fetchTrending } from './api';
import CarouselItem from './CarouselItem';
import { modalListener } from "./modal/index";

const observer = lozad();

const SectionTitle = title => h('h3.carousel-title', title)

const Carousel = ({ itemsList = [] }) =>
  h(
    'section.carousel',
    h(
      'div.scrollingPanel',
      itemsList.map(
        ({
          attributes: { titles, posterImage, slug, youtubeVideoId, startDate },
        }) =>
          CarouselItem({
            imageUrl: posterImage.medium,
            title: titles.en,
            subtitle: titles.ja_jp,
            slug,
            youtubeVideoId,
            startDate,
          })
      )
    )
  )

!(async function(document) {
  const mountReference = document.querySelector('.main').lastElementChild

  if (!mountReference) {
    return 0
  }

  const trending = await fetchTrending()
  const popular = await fetchPopular()
  const highestRated = await fetchHighestRated()

  mountReference
    .insertAdjacentElement('afterend', SectionTitle('Trending Anime'))
    .insertAdjacentElement(
      'afterend',
      Carousel({
        itemsList: trending,
      })
    )
    .insertAdjacentElement('afterend', SectionTitle('Highest Rated Anime'))
    .insertAdjacentElement(
      'afterend',
      Carousel({
        itemsList: highestRated,
      })
    )
    .insertAdjacentElement('afterend', SectionTitle('Most Popular Anime'))
    .insertAdjacentElement(
      'afterend',
      Carousel({
        itemsList: popular,
      })
    )
    observer.observe();

    document.body.addEventListener('click', (event) => {
      const tagName = event.target.tagName
      if(['IMG','A'].includes(tagName)) {
        modalListener(event)
      }
    })

    /* const allYoutubeLinks = document.querySelectorAll('.js-video-link');
    allYoutubeLinks.forEach((link) => {
      link.addEventListener('click', modalListener)
    });
 */
})(document, window)