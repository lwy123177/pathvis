const code = `

    function DFS(start, goal)
        openSet := {start} // it's a stack
        visitedSet := {start}

        while openSet is not empty
            current := the node in openSet at the top of the stack
            if current = goal
                return Found

            openSet.Remove(current)
            for each neighbor of current
                if neighbor not in visitedSet
                  visitedSet.add(neighbor)
                  openSet.add(neighbor)

        // Open set is empty but goal was never reached
        return Not Found`
export default code