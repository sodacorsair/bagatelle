import React, { Component, Fragment, useState, useEffect } from 'react'
import './index.less'
import { Link } from 'react-router-dom'

import { groupBy } from '@/lib'
import { Timeline, Icon, Pagination, Spin } from 'antd'
import { loadingIcon } from '@/components/Loading';
import BlogPagination from '@/components/web/pagination'
// import axios from '@/lib/axios'
import axios from 'axios';

function Archives(props) {
    const [list, setList] = useState([])
    const [total, setTotal] = useState(0)
    const [current, setCurrent] = useState(1)
    const [loading, setLoading] = useState(false)

    console.log(props);

    useEffect(() => {
        fetchList(1)
    }, [])

    function fetchList(page = 1) {
        // setLoading(true)
        // axios
        //     .get('http://120.79.10.11:6060/article/getList', { params: { page, pageSize: 15 } })
        //     .then(res => {
        //         console.log(res);
        //         const list = groupBy(res.rows, item => item.createdAt.slice(0, 4))
        //         setList(list)
        //         setTotal(res.count)
        //         setLoading(false)
        //     })
        // .catch(e => setLoading(false))
        axios.get('http://127.0.0.1:8088/awsl')
            .then(res => {
                console.log(res);
            })
            .catch(e => {
            })
    }

    function handlePageChange(page) {
        fetchList(page)
        setCurrent(page)
    }

    return (
        <div className="inner-content-wrapper archives">
            <Spin className="loading" tip="Loading..." indicator={loadingIcon} spinning={loading}>
                <Timeline>
                    {list.map((d, i) => (
                        <Fragment key={i}>
                            {i === 0 && (
                                <Timeline.Item>
                                    <span className="desc">{`Nice! ${total} posts in total. Keep on posting.`}</span>
                                    <br />
                                    <br />
                                </Timeline.Item>
                            )}

                            <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />} color="red">
                                <div className="year">
                                    {d[0]['createdAt'].slice(0, 4)}
                                    ...
                                </div>
                                <br />
                            </Timeline.Item>

                            {d.map(item => (
                                <Timeline.Item key={item.id}>
                                    <span style={{ fontSize: '13px', marginRight: '16px' }}>{item.createdAt.slice(5, 10)}</span>
                                    <Link to={`/article/${item.id}`}>{item.title}</Link>
                                </Timeline.Item>
                            ))}
                        </Fragment>
                    ))}
                </Timeline>

                {list.length < total && (
                    <BlogPagination
                        current={parseInt(current) || 1}
                        onChange={handlePageChange}
                        total={total}
                        pageSize={15}
                    />
                )}
            </Spin>
        </div>
    )
}

export default Archives