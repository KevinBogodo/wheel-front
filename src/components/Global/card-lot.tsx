import { Card, CardContent } from "../ui/card";


type Props = {
    lot: string,
    cardClassName: string,
    className: string
}

const CardLot = ({ lot, cardClassName, className }: Props) => {
  return (
    <Card className={cardClassName}>
        <CardContent>
        <img src={lot} className={className+"m-auto"} alt=""></img>
        </CardContent>
    </Card>
  )
}

export default CardLot;