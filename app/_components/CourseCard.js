import Link from "next/link";

export default function CourseCard(props) {
  return (
    <Link href={props.link}>
      <div className="bg-slate-800 rounded-xl shadow-lg p-6 hover:scale-105 transition-transform cursor-pointer">
        
            <img 
               src={props.image} 
               alt={props.title}
               className="w-full h-48 object-cover rounded-lg mb-4"
                       />
        
        <h3 className="text-white text-xl font-bold text-center">
          {props.title}
        </h3>
        
      </div>
    </Link>
  )
}