import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { api_url } from '../utils/constant';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function Home() {
  const [params] = useSearchParams();
  const category_id = params.get('category_id');

  const Navigate = useNavigate();
  const [Blogs, setBlogs] = useState([]);
  const [BlogCategorys, setBlogCategorys] = useState([]);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('');
  useEffect(() => {
    const timeOut = setTimeout(() => {
      let blogCategoryUrl = `${api_url}/blog/blog-category?`;
      axios
        .get(blogCategoryUrl, {
          headers: {
            Authorization: `jwt ${localStorage.getItem('authtoken')}`,
          },
        })
        .then((res) => {
          setBlogCategorys(res?.data?.BlogCategory || []);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 1000);
    return () => {
      clearTimeout(timeOut);
    };
  }, []);

  useEffect(() => {
    setActiveCategory(category_id);
  }, [category_id]);
  const onBlogClick = (blog_id) => {
    Navigate(`/blog?_id=${blog_id}`);
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      let blogUrl = `${api_url}/blog?`;
      // blogUrl = search ? blogUrl + `search=${search}` : blogUrl;
      let urlParams = new URLSearchParams();
      search && urlParams.append('search', search);
      activeCategory && urlParams.append('category', activeCategory);

      blogUrl = blogUrl + urlParams;
      // console.log(blogUrl, params);
      axios
        .get(blogUrl, {
          headers: {
            Authorization: `jwt ${localStorage.getItem('authtoken')}`,
          },
        })
        .then((res) => {
          // Navigate(search ? `/home?search=${search}` : '/home');
          setBlogs(res?.data?.blogs || []);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 1000);

    return () => clearTimeout(timeout);
  }, [search, activeCategory]);
  return (
    <div className='container'>
      <p className='fw-bold text-center fs-1 mt-5'>Welcome to home page</p>
      <div className='row'>
        <div className='col-12'>
          <input
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            placeholder='search your blog'
            className='form-control mb-5 mt-2'
          />
        </div>
        <div className='col-md-8'>
          {Blogs.map((blog) => {
            return (
              <div
                key={blog._id}
                className='shadow mb-3 text-center p-2 rounded-2'
                role='button'
                onClick={() => {
                  onBlogClick(blog._id);
                }}
              >
                <p className='fw-semibold fs-3'>{blog?.title}</p>
                <p>This is Blog content</p>
              </div>
            );
          })}
        </div>
        <div className='col-md-4'>
          <p className='text-warning text-center fs-2 rounded-2'>
            Blog Category
          </p>
          <div className='d-flex gap-2 justify-content-center flex-wrap'>
            {BlogCategorys.map((category) => {
              return (
                <div key={category._id}>
                  <p
                    onClick={() => {
                      setActiveCategory(
                        category._id === activeCategory ? '' : category._id
                      );

                      Navigate(
                        category._id === activeCategory
                          ? '/home'
                          : '/home?category_id=' + category._id
                      );
                    }}
                    className={`${
                      category._id === activeCategory
                        ? 'bg-dark text-white'
                        : 'bg-white text-dark'
                    } p-2 rounded-2 shadow`}
                    role='button'
                  >
                    {category?.title}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// // search
// //mono editor
// // ck editor
// //use search params

// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import { api_url } from '../utils/constant';
// import { useNavigate, useSearchParams } from 'react-router-dom';

// const Home = () => {
//   const [params] = useSearchParams();
//   const cat_id = params.get('cat_id');

//   const navigate = useNavigate();
//   const [allBlogs, setAllBlogs] = useState([]);
//   const [allCats, setAllCats] = useState([]);
//   const [search, setSearch] = useState('');
//   const [activeCat, setActiveCat] = useState('');

//   useEffect(() => {
//     let catUrl = `${api_url}/blog/blog-category`;
//     axios
//       .get(catUrl, {
//         headers: {
//           Authorization: `jwt ${localStorage.getItem('authToken')}`,
//         },
//       })
//       .then((res) => {
//         setAllCats(res?.data?.BlogCategory || []);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

//   useEffect(() => {
//     setActiveCat(cat_id);
//   }, [cat_id]);

//   useEffect(() => {
//     const timeOut = setTimeout(() => {
//       let blogUrl = `${api_url}/blog?`;
//       let searchParams = new URLSearchParams();
//       search && searchParams.append('search', search);
//       activeCat && searchParams.append('category', activeCat);

//       blogUrl = blogUrl + searchParams;

//       axios
//         .get(blogUrl, {
//           headers: {
//             Authorization: `jwt ${localStorage.getItem('authToken')}`,
//           },
//         })
//         .then((res) => {
//           setAllBlogs(res?.data?.blogs || []);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     }, 1000);

//     return () => clearTimeout(timeOut);
//   }, [search, activeCat]);

//   return (
//     <div className='container'>
//       <p className='fw-bold text-center fs-1 mt-5'>
//         Welcome to TechSimPlus Blogs
//       </p>

//       <div className='row'>
//         <div className='col-12'>
//           <input
//             onChange={(e) => {
//               setSearch(e.target.value);
//             }}
//             placeholder='Search Your Blog'
//             className='form-control mt-2 mb-5'
//           />
//         </div>

//         <div className='col-md-8'>
//           {allBlogs?.map((blog) => {
//             return (
//               <div className='shadow mb-3 text-center p-2 rounded-2'>
//                 <p className='fs-3 fw-semibold'>{blog.title}</p>
//                 <p>This is blog contenr</p>
//               </div>
//             );
//           })}
//         </div>
//         <div className='col-md-4'>
//           <p className='text-center fs-2 text-warning'>Blog Category</p>

//           <div className='d-flex gap-2 flex-wrap'>
//             {allCats.map((cat) => (
//               <p
//                 onClick={() => {
//                   setActiveCat(cat._id === activeCat ? '' : cat._id);
//                   navigate(
//                     '/home?cat_id=' + (cat._id === activeCat ? '' : cat._id)
//                   );
//                 }}
//                 className={`p-2 rounded-2 shadow ${
//                   activeCat === cat._id ? 'text-white bg-dark' : 'text-dark'
//                 }`}
//               >
//                 {cat.title}
//               </p>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;
