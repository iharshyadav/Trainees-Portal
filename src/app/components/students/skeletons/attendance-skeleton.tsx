
export default function AttendanceSkeleton() {
  return (
    <div className="border rounded-lg shadow-lg p-6 bg-white">

      {/* Skeleton Content */}
      <div className="space-y-4">
        {Array.from({ length: 7 }).map((_, index) => (
          <div key={index} className="flex justify-between items-center p-3 bg-gray-100 rounded-lg shadow-sm">
            <div className="h-6 w-32 bg-gradient-to-r from-gray-300 to-gray-400 animate-pulse rounded" />
            <div className="h-5 w-20 bg-gradient-to-r from-gray-300 to-gray-400 animate-pulse rounded" />
          </div>
        ))}
      </div>

      {/* Skeleton Pagination */}
      <div className="flex items-center justify-between mt-6">
        <div className="flex items-center">
          <div className="h-5 w-28 bg-gradient-to-r from-gray-300 to-gray-400 animate-pulse rounded" />
        </div>
        <div className="flex items-center">
          <div className="h-5 w-28 bg-gradient-to-r from-gray-300 to-gray-400 animate-pulse rounded" />
        </div>
      </div>

      {/* Skeleton Records per Page */}
      <div className="mt-6 flex items-center justify-end">
        <div className="mr-3 font-medium text-gray-600">Records per page:</div>
        <div className="h-5 w-12 bg-gradient-to-r from-gray-300 to-gray-400 animate-pulse rounded" />
      </div>
    </div>
  )
}