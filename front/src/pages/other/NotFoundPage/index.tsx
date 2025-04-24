import image404 from '../../../assets/images/404-not-found.svg'
import { ErrorPageComponent } from '../../../components/ErrorPageComponent'

export const NotFoundPage = ({
  title = 'Not Found',
  message = 'This page does not exist',
}: {
  title?: string
  message?: string
}) => (
  <ErrorPageComponent title={title} message={message}>
    <img src={image404} className="css.image" alt="" />
  </ErrorPageComponent>
)
