---
layout: default
---

## A data reduction technique for fast visualization of big data

{% for post in site.posts %}

### [{{ post.title }}]({{ post.url | prepend: site.baseurl }})

{{ post.content }}

{% endfor %}

