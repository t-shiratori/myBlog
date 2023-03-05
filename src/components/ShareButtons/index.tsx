import {
  FacebookIcon,
  FacebookShareButton,
  HatenaIcon,
  HatenaShareButton,
  TwitterIcon,
  TwitterShareButton,
} from 'react-share'

type TShareButtons = {
  url: string
  title: string
}

const ShareButtons = ({ url, title }: TShareButtons): JSX.Element => {
  return (
    <ul className="flex mt-4">
      <li className="mr-2">
        <TwitterShareButton url={url} title={title}>
          <TwitterIcon size={24} borderRadius={4} />
        </TwitterShareButton>
      </li>
      <li className="mr-2">
        <FacebookShareButton url={url} quote={title}>
          <FacebookIcon size={24} borderRadius={4} />
        </FacebookShareButton>
      </li>
      <li>
        <HatenaShareButton url={url} title={title}>
          <HatenaIcon size={24} borderRadius={4} />
        </HatenaShareButton>
      </li>
    </ul>
  )
}

export default ShareButtons
