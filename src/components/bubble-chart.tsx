import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { MostCommon } from '../utils/back-end-calls';

const width = 500;
const height = 500;

interface BubbleChartProps {
    data: MostCommon[]
};

const BubbleChart: React.FC<BubbleChartProps> = ({ data }) => {
    const rootRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (!data.length)
            return;

        const root = d3.select(rootRef.current);
        const hierarchy = d3.hierarchy({ children: data } as unknown as MostCommon).sum(d => d[1]);

        const packedLayout = d3.pack<MostCommon>()
                .size([width - 2, height - 2])
                .padding(3)(hierarchy);

        root
            .attr("viewBox", `0, 0, ${width}, ${height}`)
            .attr("font-size", 10)
            .attr("font-family", "sans-serif")
            .attr("text-anchor", "middle");

        const leaf = root.selectAll("g")
            .data(packedLayout.leaves())
            .join("g")
            .attr("transform", d => `translate(${d.x + 1},${d.y + 1})`);

        leaf.append("circle")
            .attr("r", d => d.r)
            .attr("fill-opacity", 0.7)
            .attr("fill", 'navy');

        leaf.append("text")
            .selectAll("tspan")
            .data(d => typeof d.data[0] === 'string' ? [d.data[0]] : d.data[0])
            .join("tspan")
            .style('fill', 'white')
            .attr("x", 0)
            .attr("y", (d, i, nodes) => `${i - nodes.length / 2 + 0.8}em`)
            .text(d => d);

        return () => { root.html('') };
    }, [data]);

    return (
        <svg ref={rootRef}/>
    );
};

export default BubbleChart;
