import withRouter from '@/components/common/withRouter'

type props = {
  children: React.ReactNode
}
const NonAuthLayout = ({ children }: props) => {
  return (
    <>
        {children}
    </>
  )
}

export default withRouter(NonAuthLayout)