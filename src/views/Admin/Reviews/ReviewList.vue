<template>
  <div class="content">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">All Reviews</h4>
          </div>
          <div class="input-group no-border fix-position-input">
            <input
              type="text"
              v-model="search"
              class="form-control"
              placeholder="Search by comment..."
            />
          </div>
          <div class="card-body">
            <div v-if="loading"><architect-loading></architect-loading></div>
            <div
              class="table-responsive"
              v-else-if="!loading && reviews && reviews.length > 0"
            >
              <table class="table table-bordered">
                <thead class=" text-primary">
                  <th>
                    Comment
                    <i
                      class="fa fa-fw fa-sort"
                      @click="sortReviews(comment)"
                    ></i>
                  </th>
                  <th>
                    Rating
                    <i
                      class="fa fa-fw fa-sort"
                      @click="sortReviews(rating)"
                    ></i>
                  </th>
                  <th>
                    Related Projects
                    <i
                      class="fa fa-fw fa-sort"
                      @click="sortReviews(project)"
                    ></i>
                  </th>
                  <th>
                    UserId
                    <i class="fa fa-fw fa-sort" @click="sortReviews(user)"></i>
                  </th>
                  <th>
                    Edit
                  </th>
                </thead>
                <tbody v-for="review in researchReviews" :key="review.id">
                  <tr>
                    <td>
                      {{ review.comment }}
                    </td>
                    <td>
                      {{ review.rating }}
                    </td>
                    <td v-if="review.project">
                      {{ review.project.name }}
                    </td>
                    <td v-else></td>
                    <td>
                      {{ review.user }}
                    </td>
                    <td class="flex-edit">
                      <architect-button
                        link
                        :path="'/dashboard/reviews/editReview/' + review._id"
                        ><i class="far fa-edit"></i
                      ></architect-button>

                      <i
                        class="far fa-trash-alt"
                        @click="onDelete(review._id)"
                      ></i>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div v-else>There is no reviews !</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ArchitectButton from "../../../components/common/ArchitectButton.vue";
export default {
  components: { ArchitectButton },
  data() {
    return {
      loading: false,
      err: null,
      search: "",
    };
  },
  created() {
    this.fetchAllReviews();
  },
  computed: {
    reviews() {
      return this.$store.getters["reviews/getReviews"];
    },
    researchReviews() {
      if (this.search) {
        return this.reviews.filter((review) => {
          return review.comment.startsWith(this.search);
        });
      } else {
        return this.reviews;
      }
    },
  },
  methods: {
    async onDelete(id) {
      try {
        await this.$store.dispatch("reviews/onDeleteReview", id);
      } catch (error) {
        this.err = error;
      }
    },
    async fetchAllReviews() {
      try {
        await this.$store.dispatch("reviews/fetchAllReviews");
      } catch (error) {
        this.err = error;
      }
    },
    async sortReviews(name) {
      try {
        await this.$store.dispatch("reviews/sortReviews", name);
      } catch (error) {
        this.err = error;
      }
    },
  },
};
</script>
<style scoped>

.fa {
cursor: pointer;}
.flex-edit {
  display: flex;
  justify-content: center;
  align-items: center;
}

.fix-position-input {
  width: 40%;
  left: 58%;
  transform: translateY(-35px);
  outline: none;
}
</style>
