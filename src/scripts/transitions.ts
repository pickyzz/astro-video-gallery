let lastVideoId = ''

/**
 * Save the ID of the last video we visited. This is used to set the
 * transition name of the video we're transitioning from in astro:after-swap.
 */
function saveLastVideoId() {
  const pathname = window.location.pathname
  const videoId = pathname.split('/').pop()
  lastVideoId = videoId || ''
}

/**
 * Creates an IntersectionObserver that sets the transition name of
 * videos in the grid when they become visible.
 *
 * This improves the performance of the page transitions considerably
 * when there is a large number of videos in the grid.
 */
document.addEventListener('astro:page-load', (e) => {
  saveLastVideoId()

  const videos = document.querySelectorAll('.grid--large .grid__cell-vid-inner')
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const target = entry.target as HTMLImageElement
        if (entry.intersectionRatio > 0) {
          // @ts-ignore - viewTransitionName is not in the spec yet
          target.style.viewTransitionName = target.id
        } else {
          // @ts-ignore - viewTransitionName is not in the spec yet
          target.style.viewTransitionName = 'none'
        }
      })
    },
    { threshold: 0 }
  )

  // Observe each video in the grid. When a video is visible, set its
  // transition name. Otherwise, set it to "none".
  videos.forEach((video) => {
    observer.observe(video)
  })
})

/**
 * When navigating back to the home page, find the image we're transitioning
 * from and set its transition name.
 */
document.addEventListener('astro:after-swap', (e) => {
  if (!lastVideoId) {
    return true
  }

  const video = document.querySelector(
    '#video-' + lastVideoId
  ) as HTMLImageElement

  // If we find the video we're transitioning from, set its transition name
  // and scroll it into view.
  if (video) {
    // @ts-ignore - viewTransitionName is not in the spec yet
    video.style.viewTransitionName = 'video-' + lastVideoId
    // @ts-ignore - scrollIntoViewIfNeeded is a Chrome-only method
    video.scrollIntoViewIfNeeded
      ? // @ts-ignore - scrollIntoViewIfNeeded is a Chrome-only method
        video.scrollIntoViewIfNeeded()
      : video.scrollIntoView()
  }
})
