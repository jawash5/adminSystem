import React, { Component } from 'react'
import { Button, Card } from 'antd'
import ReactECharts from 'echarts-for-react'

class Bar extends Component {
  state = {
    sale: [5, 20, 36, 10, 10, 20],
    inventory: [6, 24, 33, 17, 13, 25]
  }

  getOption = (sale, inventory) => {
    return {
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      legend: {
        data: ['销量', '库存']
      },
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: sale
        },
        {
          name: '库存',
          type: 'bar',
          data: inventory
        }
      ]
    }
  }

  update = () => {
    this.setState((state) => ({
      sale: state.sale.map((i) => i + 1),
      inventory: state.inventory.map((i) => i - 1)
    }))
  }

  render() {
    const { sale, inventory } = this.state
    const extra = (
      <Button type="primary" onClick={this.update}>
        更新
      </Button>
    )
    return (
      <div>
        <Card title="柱状图" extra={extra}>
          <ReactECharts option={this.getOption(sale, inventory)} />
        </Card>
      </div>
    )
  }
}

export default Bar
