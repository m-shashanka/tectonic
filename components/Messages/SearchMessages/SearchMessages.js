import { useEffect, useState } from "react";
import Spinner from "../../Layout/Spinner/Spinner";
import styles from './searchMessages.module.css';

export default function SearchMessages() {

    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]);

    return (
      <>
        <div className={styles.searchbar}>
            <div className={styles.searchIcon}>
              <i className="fas fa-search" />
            </div>
            <input
              value={text}
              onChange={(e)=>setText(e.target.value)}
              placeholder="Search"
              className={styles.searchInput}
            />
            {loading && <Spinner className={styles.userLoading}/>}
        </div>
        {/* <div className={styles.searchResult}>
          {results.map((data) => (
            <div key={data._id} className={styles.searchItem} onClick={()=>Router.push(`/${data.username}`)}>
              <div>
                <img
                  src={data.profilePicUrl}
                  alt=""
                />
              </div>
              <h4>{data.name}</h4>
            </div>
          ))}
          {(text && results.length === 0) &&
            <div className={`${styles.searchItem} ${styles.noResults}`}>
              <h4>No results found</h4>
            </div>
          }
        </div> */}
      </>
    );
}