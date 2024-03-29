import requests
from bs4 import BeautifulSoup
import re

BASE_URL = "https://en.wikipedia.org"
visited_pages = set()
to_visit_queue = []


def get_parsed_wiki_page(endpoint):
    html_page = requests.get(BASE_URL + endpoint).text
    return BeautifulSoup(html_page, 'lxml')


def get_internal_wiki_link_tags(parsed_page):
    # Find all links that begin with /wiki/ and do not contain a colon
    return parsed_page.find('div', {"id": "bodyContent"}).find_all('a', href=re.compile("^(/wiki/)((?!:).)*$"))


def add_tags_in_visit_queue(link_tags):
    if link_tags is None:
        return

    new_queue = []
    for link_tag in link_tags:
        if link_tag not in visited_pages:

            if "href" in link_tag.attrs:
                internal_link = link_tag.attrs["href"]

                if internal_link not in visited_pages and internal_link not in to_visit_queue:
                    new_queue.append(link_tag.attrs["href"])

    return new_queue


parsed_root_page = get_parsed_wiki_page("/wiki/Monty_Python")
root_internal_links = get_internal_wiki_link_tags(parsed_root_page)
to_visit_queue = add_tags_in_visit_queue(root_internal_links)

for _ in range(4):
    new_temp_visit_queue = []
    for link_to_visit in to_visit_queue:
        print("Visiting: " + link_to_visit)
        parsed_page = get_parsed_wiki_page(link_to_visit)
        internal_links = get_internal_wiki_link_tags(parsed_page)
        new_temp_visit_queue = add_tags_in_visit_queue(internal_links)

        visited_pages.add(link_to_visit)
