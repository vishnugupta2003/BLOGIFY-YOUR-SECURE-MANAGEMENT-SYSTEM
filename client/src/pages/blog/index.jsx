import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api_url } from '../../utils/constant';
import axios from 'axios';
import { Spinner } from 'reactstrap';
import BlogEditor from '../../components/editor';
import parse from 'html-react-parser';

export default function OneBlog() {
  //useParams hook use for dynamic url and useSearchParams use for dynamic query parameter.
  const [params] = useSearchParams();
  const _id = params.get('_id');
  const type = params.get('type');
  const [oneBlog, setOneBlog] = useState(null);
  const onBlurContent = (_id, data) => {
    axios
      .put(
        `${api_url}/blog/blog-content?_id=${_id}`,
        {
          content: data,
        },
        {
          headers: {
            Authorization: `jwt ${localStorage.getItem('authtoken')}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    axios
      .get(`${api_url}/blog?_id=${_id}`, {
        headers: {
          Authentication: `jwt ${localStorage.getItem('authtoken')}`,
        },
      })
      .then((res) => {
        setTimeout(() => {
          setOneBlog(res.data.blogs[0]);
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [_id]);

  return oneBlog ? (
    <div className='container'>
      <p className='text-center mt-5 fs-1 fw-bold'>{oneBlog.title}</p>
      <div className='d-flex justify-content-center flex-wrap '>
        {oneBlog.content?.map((oneContent) => {
          if (oneContent.content_type === 'image') {
            return (
              <div className='d-flex flex-wrap overflow-hidden col-8 shadow rounded p-3 mb-3 img-fluid '>
                {type?.toLowerCase() === 'edit' &&
                oneBlog?.author?._id ===
                  JSON.parse(localStorage.getItem('user'))._id ? (
                  <BlogEditor
                    onBlurContent={onBlurContent}
                    oneContent={oneContent}
                  />
                ) : (
                  // use react parse library for parsing the data. for example -: html convert to actual data.
                  // oneContent?.content
                  console.log(
                    oneContent?.content.slice(
                      57,
                      oneContent?.content.length - 1
                    )
                  )
                  // <img src={`${oneContent?.content}`} className='img-fluid'></img>
                )}
              </div>
            );
          }
        })}
      </div>
    </div>
  ) : (
    <div className='d-flex justify-content-center mt-5'>
      <Spinner />
    </div>
  );
}
