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
    [[1, 1, 1],
     [0, 1, 0]],

    [[0, 2, 2],
     [2, 2, 0]],

    [[3, 3],
     [3, 3]],

    [[4, 4, 4, 4]],

    [[0, 5, 0],
     [5, 5, 5]],

    [[6, 0],
     [6, 0],
     [6, 6]],

    [[0, 7],
     [0, 7],
     [7, 7]]
]

class Block:
    def __init__(self, shape):
        self.shape = shape
        self.color = (random.randint(50, 255), random.randint(50, 255), random.randint(50, 255))
        self.x = COLS // 2 - len(shape[0]) // 2
        self.y = 0

    def move_down(self):
        self.y += 1

    def move_left(self):
        self.x -= 1

    def move_right(self):
        self.x += 1

    def rotate(self):
        self.shape = [[self.shape[y][x] for y in range(len(self.shape))] for x in range(len(self.shape[0]))[::-1]]

    def get_blocks_positions(self):
        positions = []
        for y in range(len(self.shape)):
            for x in range(len(self.shape[y])):
                if self.shape[y][x] != 0:
                    positions.append((self.x + x, self.y + y))
        return positions


def draw_board(screen, board):
    for y in range(ROWS):
        for x in range(COLS):
            if board[y][x] != 0:
                pygame.draw.rect(screen, board[y][x], (x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE))
                pygame.draw.rect(screen, BLACK, (x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE), 1)


def main():
    pygame.init()
    screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
    pygame.display.set_caption("Tetris")
    clock = pygame.time.Clock()

    board = [[0] * COLS for _ in range(ROWS)]

    current_block = Block(random.choice(SHAPES))
    next_block = Block(random.choice(SHAPES))

    score = 0

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
                elif event.key == pygame.K_SPACE:
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
            current_block = next_block
            next_block = Block(random.choice(SHAPES))

            # Supprimer les lignes complètes et mettre à jour le score
            lines_cleared = 0
            for y in range(ROWS):
                if all(board[y]):
                    del board[y]
                    board.insert(0, [0] * COLS)
                    lines_cleared += 1
            score += lines_cleared * 100

        # Dessiner le tableau
        draw_board(screen, board)

        # Dessiner le bloc courant
        for x, y in current_block.get_blocks_positions():
            pygame.draw.rect(screen, current_block.color, (x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE))

        # Dessiner le bloc suivant
        font = pygame.font.SysFont(None, 36)
        next_text = font.render("Next Block:", True, WHITE)
        screen.blit(next_text, (SCREEN_WIDTH - 200, 50))
        for y, row in enumerate(next_block.shape):
            for x, val in enumerate(row):
                if val != 0:
                    pygame.draw.rect(screen, next_block.color, ((x + COLS + 1) * BLOCK_SIZE, (y + 2) * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE))

        # Afficher le score
        score_text = font.render("Score: " + str(score), True, WHITE)
        screen.blit(score_text, (SCREEN_WIDTH - 200, 200))

        pygame.display.flip()
        clock.tick(5)


if __name__ == "__main__":
    main()
