import { Component } from '@angular/core';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent {
  techStacks = [
    {
      title: 'Angular',
      description: 'Learn the latest features in Angular, including components, services, routing, and state management.',
      image: 'assets/angular.png',
      link: '/angular-materials'
    },
    {
      title: 'Web API in .NET',
      description: 'Explore how to build Web APIs in .NET Core, including controllers, authentication, and authorization.',
      image: 'assets/webapi.png',
      link: '/webapi-materials'
    },
    {
      title: 'Deployment to AWS',
      description: 'Learn how to deploy applications to AWS, including EC2, S3, Lambda, and API Gateway.',
      image: 'assets/aws.png',
      link: '/aws-deployment'
    },
    {
      title: 'System Design',
      description: 'Learn the fundamentals of system design, focusing on scalability, load balancing, and caching.',
      image: 'assets/sys.png',
      link: '/system-design-materials'
    },
    {
      title: 'Leetcode',
      description: 'Prepare for coding interviews by practicing problems on Leetcode, from easy to advanced levels.',
      image: 'assets/leetcode.png',
      link: '/leetcode-materials'
    },
    {
      title: 'Gmail API Integration',
      description: 'Learn how to integrate Gmail API into your applications for sending, reading, and managing emails.',
      image: 'assets/Gmail_api.png',
      link: '/gmail-api-materials'
    },
    {
      title: 'Auth0 Integration',
      description: 'Discover how to implement Auth0 for secure user authentication and management in your apps.',
      image: 'assets/auth0.png',
      link: '/auth0-materials'
    },
    {
      title: 'React',
      description: 'Learn how to build dynamic and interactive user interfaces using React.js.',
      image: 'assets/react.png',
      link: '/react-materials'      
    },
    {
      title: 'MySQL',
      description: 'Learn to create, manage, and optimize MySQL databases for efficient data storage and access.',
      image: 'assets/mysql.png',
      link: '/mysql-materials'
    }    
  ];

  forumPosts = [
    {
      id: 1,
      title: 'Angular vs React: Which is better?',
      author: 'John Doe',
      summary: 'Discuss the strengths and weaknesses of Angular and React for modern web development.',
      date: new Date()
    }
  ];

  showAll = false;

  toggleView() {
    this.showAll = !this.showAll;
  }

  get displayedTechStacks() {
    return this.showAll ? this.techStacks : this.techStacks.slice(0, 4);
  }


  openPost(postId: number): void {
    // Logic to open a specific post (could navigate to a detailed view)
    console.log('Open post:', postId);
  }

  createPost(): void {
    // Logic for creating a new post (could open a modal or navigate to a new post form)
    console.log('Create new post');
  }
  
}
