window.onload = function()
{
    const articles = fetch('articles.json');
    articles.then(response =>
    {
        if (!response.ok)
        {
            throw Error('Failed to load articles.');
        }
        else return response.json();
    }).then(articles =>
    {
        const main = document.getElementsByTagName("main")[0];
        for (const category of articles.categories)
        {
            const category_element = document.createElement("section");
            category_element.classList.add('category');

            const category_title = document.createElement("h2");
            category_title.innerText = category.name;
            category_element.appendChild(category_title);

            const container = document.createElement("div");
            container.classList.add('boxes_container');
            category_element.appendChild(container);

            for (const article of category.articles)
            {
                const article_element= document.createElement("article");
                article_element.classList.add('box');

                let title = article.title;
                let url = article.url;
                let description = article.description;

                const clickable_span = document.createElement("span");
                clickable_span.classList.add('link');

                const article_title = document.createElement("h3");
                article_title.innerText = title;
                article_title.appendChild(clickable_span);

                const hyperlink = document.createElement("a");
                hyperlink.href = url;
                hyperlink.appendChild(article_title);

                const description_element = document.createElement("p");
                description_element.innerText = description;

                article_element.appendChild(hyperlink);
                article_element.appendChild(description_element);
                container.appendChild(article_element);
            }
            main.appendChild(category_element);
        }
    })
}