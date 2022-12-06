const code = `

    function BFS(start, goal)
        openSet := {start} // it's a queue
        visitedSet := {start}

        while openSet is not empty
            size = size of openSet
            repeat size times:
              current := the node in openSet at the front of the queue
              if current = goal
                  return Found

              openSet.Remove(current)
              for each neighbor of current
                  if neighbor not in visitedSet
                    visitedSet.add(neighbor)
                    openSet.add(neighbor)

        // Open set is empty but goal was never reached
        return Not Found`
export default code;