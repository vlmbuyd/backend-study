import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PostsModel } from './entities/posts.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsModel)
    private readonly postsRepository: Repository<PostsModel>,
  ) {}

  async getAllPosts() {
    return this.postsRepository.find();
  }

  async getPostById(id: number) {
    const post = await this.postsRepository.findOne({
      where: { id },
    });

    if (!post) throw new NotFoundException();

    return post;
  }

  async createPost(author: string, title: string, content: string) {
    // 1. create -> 저장할 객체 생성
    const post = this.postsRepository.create({
      author,
      title,
      content,
      likeCount: 0,
      commentCount: 0,
    });

    // 2. save -> 객체를 저장한다. (create 메서드에서 생성한 객체 저장)
    const newPost = await this.postsRepository.save(post);

    return newPost;
  }

  async updatePost(
    postId: number,
    author?: string,
    title?: string,
    content?: string,
  ) {
    // save의 기능
    // 1. 만약에 데이터가 존재하지 않는다면 (id 기준으로) 새로 생성한다.
    // 2. 만약에 데이터가 존재한다면 (같은 id의 값이 존재) 존재하는 데이터의 값을 업데이트한다.
    // 3. 데이터베이스에 저장한다.

    const post = await this.postsRepository.findOne({
      where: { id: postId },
    });

    if (!post) throw new NotFoundException();

    if (author) {
      post.author = author;
    }

    if (title) {
      post.title = title;
    }

    if (content) {
      post.content = content;
    }

    const newPost = await this.postsRepository.save(post);

    return newPost;
  }

  async deletePost(postId: number) {
    const post = await this.postsRepository.findOne({
      where: { id: postId },
    });

    if (!post) {
      throw new NotFoundException();
    }

    await this.postsRepository.delete(postId);

    return postId;
  }
}
