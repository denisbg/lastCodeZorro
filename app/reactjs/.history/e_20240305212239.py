import pygame
import random

# (Le reste du code reste inchangé...)

class Block:
    def __init__(self, shape):
        self.shape = shape
        self.color = (random.randint(50, 255), random.randint(50, 255), random.randint(50, 255))
        self.x = COLS // 2 - len(shape[0]) // 2
        self.y = 0

    # (Le reste du code reste inchangé...)

def draw_board(screen, board):
    for y in range(ROWS):
        for x in range(COLS):
            if board[y][x] != 0:
                pygame.draw.rect(screen, board[y][x], (x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE))
                pygame.draw.rect(screen, BLACK, (x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE), 1)

def clear_lines(board):
    lines_to_clear = [i for i, row in enumerate(board) if all(cell != 0 for cell in row)]

    for line in lines_to_clear:
        del board[line]
        board.insert(0, [0] * COLS)

    return len(lines_to_clear)

# (Le reste du code reste inchangé...)

def main():
    # (Le reste du code reste inchangé...)

    score = 0

    while True:
        # (Le reste du code reste inchangé...)

        # Déplacer le bloc vers le bas
        current_block.move_down()
        if any((y >= ROWS or board[y][x] != 0) for x, y in current_block.get_blocks_positions()):
            current_block.move_up()
            for x, y in current_block.get_blocks_positions():
                board[y][x] = current_block.color
            score += clear_lines(board)  # Mettre à jour le score en fonction des lignes complètes
            current_block = next_block
            next_block = Block(random.choice(SHAPES))

        # Dessiner le tableau
        draw_board(screen, board)

        # (Le reste du code reste inchangé...)

        pygame.display.set_caption(f"Tetris - Score: {score}")

# (Le reste du code reste inchangé...)

if __name__ == "__main__":
    main()
