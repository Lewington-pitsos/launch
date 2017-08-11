require 'pg'

class Todo

  attr_reader :data, :id

  def initialize data, id
    @id = id.to_i
    @data = data
  end

  def find_all
    output = data.exec("SELECT * FROM todos WHERE list_id=#{id}")
    output.map do |todo|
      p todo
      { id: todo["id"], name: todo["name"], completed: converted(todo["completed"]) }
    end
  end

  def converted state
    state == "t"
  end

end


class DatabasePersistence

  DB_NAME= 'todos'
  LIST_NAME = 'lists'
  TODOS = 'todos'

  ALL_TODOS = Proc.new do |list_id|
    data.exec("SELECT * FROM todos WHERE id=#{list_id}")
  end

  attr_accessor :data

  def initialize(session)
    @data= PG.connect(dbname: DB_NAME)
  end

  def find_list(id)
    output = data.exec("SELECT * FROM #{LIST_NAME} WHERE id=#{id}")
    output.map do |row|
        { id: row["id"], name: row["name"], todos: Todo.new(data, row["id"]) }
    end[0]
  end

  def all_lists
    output = data.exec "SELECT * FROM #{LIST_NAME}"

    output.map do |row|
      { id: row["id"], name: row["name"], todos: Todo.new(data, row["id"]) }
    end
  end

  def create_new_list(list_name)
    command = "INSERT INTO #{LIST_NAME} (name) VALUES ($1)"
    data.exec_params(command, [list_name])
  end

  def delete_list(id)
    data.exec("DELETE FROM #{LIST_NAME} WHERE id=#{id}")
  end

  def update_list_name(id, new_name)
    command = "UPDATE #{LIST_NAME} SET name=$1 WHERE id=#{id}"
    data.exec_params(command, [new_name])
  end

  def create_new_todo(list_id, todo_name)
    command = "INSERT INTO #{TODOS} (name, list_id) VALUES ($1, #{list_id})"
    data.exec_params(command, [todo_name])
  end

  def delete_todo_from_list(list_id, todo_id)
    data.exec("DELETE FROM todos WHERE list_id = #{list_id} AND id = #{todo_id}")
  end

  def update_todo_status(list_id, todo_id, new_status)
    data.exec("UPDATE todos SET completed=#{new_status} WHERE list_id = #{list_id} AND id = #{todo_id}")
  end

  def mark_all_todos_as_completed(list_id)
    data.exec("UPDATE todos SET completed=true WHERE list_id = #{list_id}")
  end
end
