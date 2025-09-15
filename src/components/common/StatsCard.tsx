import { Card } from "antd"
import type { ReactNode } from "react"
import { cn } from "../../utils"
interface StatsCardProps{
    icon:ReactNode,
    title:string,
    count:number
    bgColor?:string
}
const StatsCard = ({icon,title,count,bgColor='!bg-green-200'}:StatsCardProps) => {
  return (
  <Card className={cn('!min-w-xs',bgColor)}>
       <div className='flex justify-between items-center'> {icon}
       <div> <h3 className='text-xl font-semibold' >{title}</h3>
        <p className='font-medium text-lg '>{count}</p>
        </div>
        </div>
      </Card>
  )
}
export default StatsCard