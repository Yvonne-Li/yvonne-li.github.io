---
layout: default
title: Home
show_title: false
---

<div class="split-container" markdown="1">

<div class="intro-section" markdown="1">

## Welcome Travellers!

I'm Yvonne. Here, you can check out what I'm currently working on..
<h4 class="joke-header">Tell me a joke about something:</h4>

<div class="search-section">
<input
type="text"
id="search-input"
placeholder="Enter a topic for puns..."
class="search-input"
>
<button
id="search-button"
class="search-button"
>Generate Puns</button>
<div id="loading" class="loading-indicator">Loading...</div>
</div>

<div
id="response-container"
class="response-container"
></div>

</div>

<div class="blog-section" markdown="1">

## Latest Posts

<ul class="posts">
{% for post in site.posts limit:3 %}
<li class="post-item">
<div class="post-meta">
<span>{{ post.date | date_to_string }}</span>
</div>
<div class="post-title-container">
<a href="{{ post.url | relative_url }}" title="{{ post.title }}" class="post-link">{{ post.title }}</a>
{% if post.custom_excerpt %}
<p class="post-excerpt">{{ post.custom_excerpt }}</p>
{% endif %}
</div>
</li>
{% endfor %}
</ul>
</div>
</div>

<script src="/assets/js/puns.js"></script>