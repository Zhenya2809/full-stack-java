<template>
  <a :href="postLink">
    <article class="card">
      <img :src="image" :alt="imageAlt" class="card__image"/>

      <div class="card__body">
        <h3 class="card__title">{{ title }}</h3>
        <ul class="card__params">
          <li>
            <span class="iconify" data-icon="ant-design:eye-filled"></span> {{ views }}
          </li>
          <li>
            <span class="iconify" data-icon="fluent:comment-12-filled"></span> {{ comments }}
          </li>
          <li>
            <span class="iconify" data-icon="ant-design:calendar-filled"></span>
            <time>{{ publishDate }}</time>
          </li>
        </ul>
        <p class="card__text">{{ text }}</p>
        <span class="btn"><slot></slot></span>
      </div>
      <!-- /.card__body -->
    </article>
  </a>
</template>

<script>
export default {
  name: "UCard",
  props: {
    postLink: String,
    image: String,
    imageAlt: String,
    title: String,
    views: [String, Number],
    comments: [String, Number],
    publishDate: String,
    text: String,
    buttonName: String,
  },
};
</script>

<style scoped>
.card {
  width: 300px;
  background-color: #fbfffb;
  border-radius: 10px;
}

.card__image {
  border-radius: 10px 10px 0 0;
}

.card__body {
  padding: 30px 20px;
  display: grid;
  grid-template-columns: 1fr;
}

.card__title {
  font-size: 18px;
  line-height: 122%;
  font-weight: 700;
  margin-bottom: 5px;
}

.card__params {
  margin-bottom: 15px;
  display: flex;
  gap: 15px;
}

.card__params li {
  font-size: 12px;
  color: #9CA0D2;
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.card__params li .iconify {
  margin-top: -4px;
}

.card__text {
  color: #0e0f13;
  font-size: 14px;

  margin-bottom: 1px;
}
</style>