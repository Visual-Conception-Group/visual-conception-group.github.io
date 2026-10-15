---
layout: page
title: Resources
eyebrow: Open data and code
lede: Datasets and code released by the group.
permalink: /resources/
description: >-
  Datasets and code from the Visual Conception Group, IIIT Delhi: the IN-SAT land cover dataset,
  the IIITD-20K text-to-person re-ID benchmark, and code on GitHub.
---
{%- comment -%}
  Each dataset also has a schema.org "Dataset" entry at the bottom of this file, which lets it
  appear in Google Dataset Search. When you add or change a dataset, update both, and keep the
  descriptions the same.
{%- endcomment %}

<div class="prose" markdown="1">

## Datasets

### IN-SAT: land cover classification dataset for the Indian subcontinent {#in-sat}

Sentinel-2 imagery for land cover classification. Published at IGARSS 2021 ([paper]({{ '/publications/' | relative_url }}#pub-{{ "In-Sat: A Novel Land Cover Classification Dataset for Indian Subcontinent" | slugify | truncate: 60, "" }})).

[In-Sat on GitHub](https://github.com/Visual-Conception-Group/In-Sat)

### IIITD-20K: dense captioning for text-image person re-identification {#iiitd-20k}

20,000 identities captured in the wild, each image described in at least 26 words, with a benchmarking framework for text-to-image ReID models. Published at ICVGIP 2023 ([paper]({{ '/publications/' | relative_url }}#pub-{{ "Dense captioning for Text-Image ReID" | slugify | truncate: 60, "" }})).

[Benchmark code on GitHub](https://github.com/Visual-Conception-Group/Dense-Captioning-for-Text-Image-ReID)

## Code

Code for most of our recent papers is on the [group's GitHub](https://github.com/Visual-Conception-Group), and each paper on the [publications page]({{ '/publications/' | relative_url }}) links to its own repository.

</div>

{%- capture lab %}{ "@type": "Organization", "name": {{ site.title | jsonify }}, "url": {{ "/" | absolute_url | jsonify }} }{% endcapture %}
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Dataset",
      "name": "IN-SAT: land cover classification dataset for the Indian subcontinent",
      "alternateName": "In-Sat",
      "description": "Sentinel-2 satellite imagery for land cover classification of the Indian subcontinent, released by the Visual Conception Group at IIIT Delhi. Published at IGARSS 2021.",
      "url": {{ "/resources/" | absolute_url | append: "#in-sat" | jsonify }},
      "sameAs": "https://github.com/Visual-Conception-Group/In-Sat",
      "creator": {{ lab }},
      "isAccessibleForFree": true,
      "citation": "https://doi.org/10.1109/IGARSS47720.2021.9553772"
    },
    {
      "@type": "Dataset",
      "name": "IIITD-20K: dense captioning for text-image person re-identification",
      "alternateName": "IIITD-20K",
      "description": "20,000 identities captured in the wild, each image described in at least 26 words, with a benchmarking framework for text-to-image person re-identification models. Published at ICVGIP 2023.",
      "url": {{ "/resources/" | absolute_url | append: "#iiitd-20k" | jsonify }},
      "sameAs": "https://github.com/Visual-Conception-Group/Dense-Captioning-for-Text-Image-ReID",
      "creator": {{ lab }},
      "isAccessibleForFree": true,
      "citation": "https://doi.org/10.1145/3627631.3627648"
    }
  ]
}
</script>
