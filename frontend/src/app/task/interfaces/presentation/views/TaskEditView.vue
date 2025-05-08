<template>
  <div>
    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success">
      <b-row>
        <b-col md="12">
          <b-card class="shadow-sm rounded-3">
            <b-card-body>
              Tarea:
              <h4 class="text-left mb-4">
                {{ selectedTask.name }}
              </h4>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </base-header>
    <b-container fluid class="mt-7">
      <b-row>
        <b-col>
          <b-card>
            <b-card-header
              class="d-flex justify-content-between align-items-center"
            >
              <!-- Input para nuevo comentario -->
              <b-input-group size="m">
                <b-form-input
                  v-model="newComment"
                  placeholder="Escribe un comentario..."
                ></b-form-input>
                <b-input-group-append>
                  <b-button variant="success" @click="addComment"
                    >Agregar</b-button
                  >
                </b-input-group-append>
              </b-input-group>
            </b-card-header>

            <b-card-body>
              <!-- Lista de Comentarios -->
              <div v-if="comments && comments.length">
                <b-list-group flush>
                  <b-list-group-item
                    v-for="comment in comments"
                    :key="comment.id"
                  >
                    🗨️ {{ comment.content }}
                  </b-list-group-item>
                </b-list-group>

                <!-- Paginación estilo Laravel -->
                <b-pagination
                  v-model="query.current_page"
                  :per-page="query.limit"
                  :total-rows="query.total"
                  align="right"
                  size="sm"
                  class="mt-3"
                  @input="fetchData"
                ></b-pagination>
              </div>
              <div v-else class="text-muted">No hay comentarios aún.</div>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Modal from "@/components/Modal";
import { Order } from "@/app/global/requests/dtos/TableRequest.ts";
import { CommentRepositoryImpl } from "@/app/comment/infrastructure/repositories/CommentRepositoryImpl";
import {
  ListCommentUseCase,
  StoreCommentUseCase,
} from "@/app/comment/usecases";
import Comment from "@/app/comment/domain/entities/Comment";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Table,
  TableColumn,
} from "element-ui";

export default {
  components: {
    [Dropdown.name]: Dropdown,
    [DropdownItem.name]: DropdownItem,
    [DropdownMenu.name]: DropdownMenu,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,

    [Modal.name]: Modal,
  },
  mounted() {
    this.fetchData();
  },
  computed: {
    ...mapGetters(["selectedTask"]),
  },
  data() {
    return {
      newComment: "",
      query: {
        limit: 5,
        offset: 0,
        order: Order.ASC,
        current_page: 1,
        sort_column: "id",
        sort_direction: Order.ASC,
        search: "",
      },
      showModal: false,

      formData: {
        name: "",
        description: null,
        priority: "low",
        completed: false,
        expires_at: null,
      },
      task: {},

      comments: [],
    };
  },
  methods: {
    async fetchData() {
      // store.isShowMainLoader = true;
      try {
        this.query.task_id = this.selectedTask.id;

        const commentRepository = new CommentRepositoryImpl();
        const listCommentUseCase = new ListCommentUseCase(commentRepository);
        const { data } = await listCommentUseCase.execute(this.query);
        console.log(data.data);
        this.comments = data.data;
        this.query.total = data.total;
      } catch (error) {
        console.error("Error fetching comment", error);
      } finally {
        // store.isShowMainLoader = false;
      }
    },
    async addComment() {
      if (!this.newComment.trim()) return;

      try {
        const commentRepository = new CommentRepositoryImpl();
        const storeCommentUseCase = new StoreCommentUseCase(commentRepository);
        const comment = new Comment({
          task_id: this.selectedTask.id,
          content: this.newComment.trim(),
        });

        const data = await storeCommentUseCase.execute(comment);
        if (!data.error) this.fetchData();
        this.newComment = "";
      } catch (error) {
        console.error("Error agregando comentario", error);
      }
    },
  },
};
</script>
