const dummy = (blogs) => {
  const weirdSum = blogs.length - blogs.length + 1;
  return weirdSum;
};

const totalLikes = (posts) => {
  const totalPosts = posts.reduce((sum, post) => sum + post.likes, 0);
  return totalPosts;
};

const favoriteBlog = (blogs) => {
  const favorite = blogs.reduce((previous, current) => {
    return previous.likes > current.likes ? previous : current;
  });

  return favorite;
};

const mostBlogs = (blogs) => {
  const blogsByAuthor = blogs.reduce((acc, current) => {
    const newArr = JSON.parse(JSON.stringify(acc));
    const authorIndex = newArr.findIndex(
      (collection) => current.author === collection[0].author
    );
    if (authorIndex !== -1) newArr[authorIndex].push(current);
    else newArr.push([current]);
    return newArr;
  }, []);

  const mostBlogsByAuthor = blogsByAuthor.reduce((prev, current) => {
    if (prev.length > current.length) return prev;
    return current;
  }, []);

  const finalObject = {
    author: mostBlogsByAuthor[0].author,
    blogs: mostBlogsByAuthor.length,
  };

  return finalObject;
};

const mostLikes = (blogs) => {
  const blogsByAuthor = blogs.reduce((acc, current) => {
    const newArr = JSON.parse(JSON.stringify(acc));
    const authorIndex = newArr.findIndex(
      (collection) => current.author === collection[0].author
    );
    if (authorIndex !== -1) newArr[authorIndex].push(current);
    else newArr.push([current]);
    return newArr;
  }, []);

  const likesAcc = blogsByAuthor.map((currentAuthorPosts) => {
    const postsReduced = currentAuthorPosts.reduce((acc, current) => {
      if (!acc) return { author: current.author, likes: current.likes };
      else return { ...acc, likes: acc.likes + current.likes };
    }, null);

    return postsReduced;
  });

  const mostLikedAuthor = likesAcc.reduce((prev, current) => {
    return prev.likes > current.likes ? prev : current;
  }, {});

  return mostLikedAuthor
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
