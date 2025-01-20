import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface Category {
  id: number;
  name: string;
  todos: Todo[];
  subcategories: Category[];
}

export default function IndexPage() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([
    {
      id: 1,
      name: "Marketing",
      todos: [],
      subcategories: [
        {
          id: 2,
          name: "Social Media",
          todos: [],
          subcategories: []
        }
      ]
    },
    {
      id: 3,
      name: "Development",
      todos: [],
      subcategories: [
        {
          id: 4,
          name: "Repo1",
          todos: [],
          subcategories: []
        },
        {
          id: 5,
          name: "Repo2",
          todos: [],
          subcategories: []
        }
      ]
    }
  ]);

  const addTodo = (categoryId: number, text: string) => {
    setCategories(prevCategories =>
      prevCategories.map(category =>
        category.id === categoryId
          ? {
              ...category,
              todos: [...category.todos, { id: Date.now(), text, completed: false }]
            }
          : category
      )
    );
  };

  return (
    <div className="container mx-auto px-4 py-16 space-y-32">
      {/* Hero Section */}
      <motion.section
        className="text-center space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Badge variant="secondary" className="mb-4">
          Welcome to Your Todo App
        </Badge>
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          Manage Your Startup Tasks
        </h1>
        <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
          Organize tasks by categories and subcategories.
        </p>
        <Button size="lg" className="mt-4" onClick={() => navigate('/dashboard')}>
          View Dashboard <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </motion.section>

      {/* Categories and Todos Section */}
      <motion.section
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="space-y-8"
      >
        {categories.map(category => (
          <motion.div key={category.id} variants={fadeInUp}>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold">{category.name}</h3>
                <Accordion>
                  {category.subcategories.map(subcategory => (
                    <div key={subcategory.id} className="mb-4">
                      <h4 className="text-lg font-semibold">{subcategory.name}</h4>
                      <ul className="list-disc pl-5">
                        {subcategory.todos.map(todo => (
                          <li key={todo.id} className="text-muted-foreground">
                            {todo.text}
                          </li>
                        ))}
                      </ul>
                      <Input
                        placeholder="Add a new todo"
                        onKeyDown={e => {
                          if (e.key === 'Enter' && e.currentTarget.value) {
                            addTodo(subcategory.id, e.currentTarget.value);
                            e.currentTarget.value = '';
                          }
                        }}
                      />
                    </div>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.section>
    </div>
  );
}
