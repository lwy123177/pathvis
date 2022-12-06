const code = `

    function A_Star(start, goal, h)
        openSet := {start} // it's a min-heap
        gScore := map with default value of Infinity
        gScore[start] := 0
        fScore := map with default value of Infinity
        fScore[start] := h(start)

        while openSet is not empty
            current := the node in openSet having the lowest fScore[] value
            if current = goal
                return Found

            openSet.Remove(current)
            for each neighbor of current
                tentative_gScore := gScore[current] + d(current, neighbor)
                if tentative_gScore < gScore[neighbor]
                    // This path to neighbor is better than any previous one. Record it!
                    gScore[neighbor] := tentative_gScore
                    fScore[neighbor] := tentative_gScore + h(neighbor)
                    if neighbor not in openSet
                        openSet.add(neighbor)

        // Open set is empty but goal was never reached
        return Not Found`
export default code;