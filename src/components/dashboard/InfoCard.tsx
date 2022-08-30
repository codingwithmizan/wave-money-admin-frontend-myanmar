import { Link } from "react-router-dom";
interface InfoCardProps {
  title: string;
  count: string;
  type: string;
  start_date: string
  end_date: string
}

export function InfoCard({ title, count, type, start_date, end_date }: InfoCardProps) {
  return (
    <div className="bg-white text-center rounded shadow p-2" style={{height: '100px'}}>
      <Link to={`/otc-profiles?filter_by=${type}&start_date=${start_date}&end_date=${end_date}`}>
        <div className="relative top-3">
            <div className="text-xl text-orange-600 mb-1">{count}</div>
            <h6 className="text-sm font-semibold pb-4 text-sky-800 text-ellipsis">{title}</h6>
        </div>
      </Link>
    </div>
  );
}
