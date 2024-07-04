import pygame
import random

# Définition des constantes
SCREEN_WIDTH = 800
SCREEN_HEIGHT = 600
BLOCK_SIZE = 30
ROWS = 20
COLS = 10
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)

# Formes des blocs
SHAPES = [
    [[1, 1, 1, 1]],
    [[1, 1, 1], [0, 1, 0]],
    [[1, 1, 1], [1, 0, 0]],
    [[1, 1], [1, 1]],
    [[0, 1, 1], [1, 1, 0]],
    [[1, 1, 0], [0, 1, 1]],
    [[0, 1], [1, 1], [1, 0]]
]


class Block:
    def __init__(self):
        self.shape = random.choice(SHAPES)
        self.color = (random.randint(50, 255), random.randint(50, 255), random.randint(50, 255))
        self.rotation = 0
        self.x = COLS // 2 - len(self.shape[0]) // 2
        self.y = 0

    def move_down(self):
        self.y += 1

    def move_left(self):
        self.x -= 1

    def move_right(self):
        self.x += 1

    def rotate(self):
        self.rotation = (self.rotation + 1) % 4

    def get_blocks_positions(self):
        positions = []
        shape = self.shape[self.rotation]
        for y in range(len(shape)):
            for x in range(len(shape[y])):
                if shape[y][x] == 1:
                    positions.append((self.x + x, self.y + y))
        return positions


def draw_board(screen, board):
    for y in range(ROWS):
        for x in range(COLS):
            if board[y][x] != 0:
                pygame.draw.rect(screen, board[y][x], (x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE))
                pygame.draw.rect(screen, BLACK, (x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE), 1)


def remove_completed_rows(board):
    completed_rows = 0
    for y in range(ROWS):
        if all(board[y]):
            del board[y]
            board.insert(0, [0] * COLS)
            completed_rows += 1
    return completed_rows


def main():
    pygame.init()
    screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
    pygame.display.set_caption("Tetris")
    clock = pygame.time.Clock()

    board = [[0] * COLS for _ in range(ROWS)]
    score = 0
    font = pygame.font.Font(None, 36)

    current_block = Block()
    next_block = Block()

    while True:
        screen.fill(BLACK)

        # Contrôles
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                return
            elif event.type == pygame.KEYDOWN:
                if event.key == pygame.K_LEFT:
                    current_block.move_left()
                    if any((x < 0 or board[y][x] != 0) for x, y in current_block.get_blocks_positions()):
                        current_block.move_right()
                elif event.key == pygame.K_RIGHT:
                    current_block.move_right()
                    if any((x >= COLS or board[y][x] != 0) for x, y in current_block.get_blocks_positions()):
                        current_block.move_left()
                elif event.key == pygame.K_DOWN:
                    current_block.move_down()
                    if any((y >= ROWS or board[y][x] != 0) for x, y in current_block.get_blocks_positions()):
                        current_block.move_up()
                elif event.key == pygame.K_UP:
                    current_block.rotate()
                    if any((x < 0 or x >= COLS or y >= ROWS or board[y][x] != 0) for x, y in
                           current_block.get_blocks_positions()):
                        current_block.rotate()

        # Déplacer le bloc vers le bas
        current_block.move_down()
        if any((y >= ROWS or board[y][x] != 0) for x, y in current_block.get_blocks_positions()):
            current_block.move_up()
            for x, y in current_block.get_blocks_positions():
                board[y][x] = current_block.color
            completed_rows = remove_completed_rows(board)
            score += completed_rows * 100

            current_block = next_block
            next_block = Block()

        # Dessiner le tableau
        draw_board(screen, board)

        # Dessiner le bloc courant
        for x, y in current_block.get_blocks_positions():
            pygame.draw.rect(screen, current_block.color, (x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE))

        # Afficher le score
        score_text = font.render(f"Score: {score}", True, WHITE)
        screen.blit(score_text, (10, 10))

        pygame.display.flip()
        clock.tick(5)


if __name__ == "__main__":
    main()
```
