import { useRouter } from "next/router";
import Toolbar from "../../components/toolbar";
import styles from "../../styles/News.module.css";

export default function News({ pageNumber, articles }) {
  // console.log(pageNumber, articles);
  const router = useRouter();

  const handleClickPrevious = () => {
    if (pageNumber > 1) {
      router.push(`/tech/${pageNumber - 1}`);
    }
  };

  const handleClickNext = () => {
    if (pageNumber < 10) {
      router.push(`/tech/${pageNumber + 1}`);
    }
  };

  return (
    <div className="page-container">
      <Toolbar />
      <div className={styles.main}>
        <h1>Technology Articles</h1>
        {articles.map((article, index) => (
          <div key={index} className={styles.post}>
            <h1 onClick={() => (window.location.href = article.url)}>
              {article.title}
            </h1>
            <p>{article.description}</p>
            {!!article.urlToImage && <img src={article.urlToImage} />}
            <div className={styles.reference}>
              <p>
                Published - {article.publishedAt.substring(11, 16)}
                {" on "} {article.publishedAt.substring(5, 10)}-2022
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.paginator}>
        <div
          onClick={handleClickPrevious}
          className={pageNumber === 1 ? styles.disabled : styles.active}
        >
          Previous Page
        </div>

        <div>#{pageNumber}</div>

        <div
          onClick={handleClickNext}
          className={pageNumber === 10 ? styles.disabled : styles.active}
        >
          Next Page
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  // const params = context;
  // const pageNumber = params;
  const pageNumber = context.query.pageId;

  if (!pageNumber || pageNumber < 1 || pageNumber > 10) {
    return {
      props: {
        articles: [],
        pageNumber: 1,
      },
    };
  }

  const response = await fetch(
    `https://newsapi.org/v2/everything?domains=techcrunch.com,thenextweb.com&pageSize=10&page=${pageNumber}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NEWS_KEY}`,
      },
    }
  );

  const data = await response.json();
  // console.log(data);
  const { articles } = data;

  return {
    props: {
      articles,
      pageNumber: Number.parseInt(pageNumber),
    },
  };
}
