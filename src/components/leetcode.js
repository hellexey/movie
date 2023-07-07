const topKFrequent = function (nums, k) {
  const map = nums.reduce((acc, num) => {
    if (num in acc) {
      acc[num] += 1
    } else {
      acc[num] = 1
    }
    return acc
  }, {})
  const arr = Object.entries(map)
  console.log(arr)
  arr.sort((a, b) => b[1] - a[1])
  return arr.slice(0, k).map(([num]) => num)
}

console.log(topKFrequent([4, 1, -1, 2, -1, 2, 3], 2))
